
import React, { useState } from 'react';
import type { Document } from '../types.ts';
import Card from './Card.tsx';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface DocumentsProps {
    documents: Document[];
    onAddDocument: (doc: Omit<Document, 'id' | 'url'>) => void;
    onDeleteDocument: (docId: string) => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


const AddDocumentForm: React.FC<{ onAdd: (doc: Omit<Document, 'id' | 'url'>) => void }> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<Document['type']>('pdf');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim()) {
            // Simulate file properties
            const simulatedSize = Math.floor(Math.random() * 5 * 1024 * 1024); // 0 to 5MB
            onAdd({
                name: `${name}.${type}`,
                type,
                size: simulatedSize,
                uploadDate: new Date().toISOString()
            });
            setName('');
        }
    }

    return (
        <Card>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Yeni Doküman Yükle</h2>
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Dosya adı (uzantısız)"
                        className="flex-grow bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <select value={type} onChange={e => setType(e.target.value as Document['type'])} className="bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="pdf">.pdf</option>
                        <option value="docx">.docx</option>
                        <option value="xlsx">.xlsx</option>
                        <option value="png">.png</option>
                        <option value="jpg">.jpg</option>
                        <option value="md">.md</option>
                    </select>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-4 py-2 text-sm transition-colors flex items-center space-x-2">
                        <UploadIcon className="w-4 h-4" />
                        <span>Ekle</span>
                    </button>
                </form>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Not: Bu bir simülasyondur. Gerçek dosya yükleme işlemi uygulanmamıştır.</p>
            </div>
        </Card>
    )
}


const Documents: React.FC<DocumentsProps> = ({ documents, onAddDocument, onDeleteDocument }) => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dokümanlar</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Proje ile ilgili tüm dosyaları buradan yönetin.</p>
            </header>

            <AddDocumentForm onAdd={onAddDocument} />

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800/50 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th scope="col" className="px-6 py-3">Dosya Adı</th>
                                <th scope="col" className="px-6 py-3">Tür</th>
                                <th scope="col" className="px-6 py-3">Boyut</th>
                                <th scope="col" className="px-6 py-3">Yükleme Tarihi</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">İşlemler</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{doc.name}</a>
                                    </th>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 uppercase">{doc.type}</span>
                                    </td>
                                    <td className="px-6 py-4">{formatBytes(doc.size)}</td>
                                    <td className="px-6 py-4">{format(new Date(doc.uploadDate), 'dd MMMM yyyy, HH:mm', { locale: tr })}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => onDeleteDocument(doc.id)} className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {documents.length === 0 && (
                        <p className="text-center py-8 text-gray-500 dark:text-gray-400">Bu projede hiç doküman yok.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Documents;