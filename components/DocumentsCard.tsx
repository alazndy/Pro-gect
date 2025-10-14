
import React from 'react';
import type { Document } from '../types.ts';
import Card from './Card.tsx';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface DocumentsCardProps {
  documents: Document[];
}

const getFileIcon = (type: Document['type']) => {
    switch (type) {
        case 'pdf': return '📄';
        case 'docx': return '📝';
        case 'xlsx': return '📊';
        case 'png':
        case 'jpg': return '🖼️';
        default: return '📁';
    }
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ documents }) => {
    const recentDocuments = [...documents].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()).slice(0, 3);

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Proje Dokümanları</h2>
                    <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Yönet →</span>
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toplam <span className="font-bold text-gray-700 dark:text-gray-200">{documents.length}</span> doküman.
                    </p>

                    <div className="pt-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Son Eklenenler</h3>
                        {recentDocuments.length > 0 ? (
                            <ul className="space-y-2">
                                {recentDocuments.map(doc => (
                                    <li key={doc.id} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="text-lg">{getFileIcon(doc.type)}</span>
                                        <div className="flex-1 truncate">
                                            <p className="font-medium truncate">{doc.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatDistanceToNow(new Date(doc.uploadDate), { addSuffix: true, locale: tr })}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Hiç doküman eklenmemiş.</p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DocumentsCard;