
import express, { Request, Response } from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for tasks

// IMPORTANT: Make sure the serviceAccountKey.json file is in the api-server directory
// The 'any' type is used here because the JSON file can have various structures.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// Test endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Pro-Gect API Server is running!');
});

// Get all projects
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    const projects: any[] = [];
    projectsSnapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Error getting projects', error });
  }
});

// Get a single project by ID
app.get('/api/projects/:projectId', async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        const projectDoc = await db.collection('projects').doc(projectId).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ id: projectDoc.id, ...projectDoc.data() });
    } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ message: 'Error getting project', error });
    }
});

// Add a new task to a project
app.post('/api/projects/:projectId/tasks', async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        const { title, description, status } = req.body;

        if (!title || !status) {
            return res.status(400).json({ message: 'Title and status are required for a new task.' });
        }

        const projectRef = db.collection('projects').doc(projectId);
        const projectDoc = await projectRef.get();

        if (!projectDoc.exists) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newTask = {
            id: uuidv4(),
            title,
            description: description || '',
            status,
            completed: status === 'done',
            createdAt: new Date().toISOString(),
        };

        await projectRef.update({
            tasks: admin.firestore.FieldValue.arrayUnion(newTask)
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Error adding task', error });
    }
});

// Update a task within a project
// Note: This is a more complex operation as it requires finding and updating an item in an array.
app.put('/api/tasks/:taskId', async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body; // e.g., { "status": "in-progress", "completed": false }

        if (!taskId || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Task ID and update data are required.' });
        }

        // Find the project that contains the task
        const projectsSnapshot = await db.collection('projects').where('tasks', 'array-contains-any', [{id: taskId}]).get();
        
        if (projectsSnapshot.empty) {
            return res.status(404).json({ message: 'Task not found in any project.' });
        }

        // Assuming a task ID is unique across all projects for simplicity
        const projectDoc = projectsSnapshot.docs[0];
        const projectData = projectDoc.data();
        const tasks = projectData.tasks || [];
        
        let taskFound = false;
        const updatedTasks = tasks.map((task: any) => {
            if (task.id === taskId) {
                taskFound = true;
                return { ...task, ...updates };
            }
            return task;
        });

        if (!taskFound) {
             return res.status(404).json({ message: 'Task not found in the project.' });
        }

        await projectDoc.ref.update({ tasks: updatedTasks });

        res.status(200).json({ message: 'Task updated successfully.' });

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error });
    }
});


app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
