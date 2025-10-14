import React from 'react';

interface TagProps {
    tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
    // A simple hash function to get a consistent color for a tag
    const getTagColor = (tagName: string) => {
        let hash = 0;
        if (tagName.length === 0) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        for (let i = 0; i < tagName.length; i++) {
            const char = tagName.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        const colors = [
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
        ];
        return colors[Math.abs(hash) % colors.length];
    };
    
    return (
        <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${getTagColor(tag)}`}>
            {tag}
        </span>
    );
};

export default Tag;
