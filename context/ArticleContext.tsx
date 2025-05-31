// ArticleContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Article {
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        name: string;
    };
}

interface ArticleContextType {
    article: Article | null;
    setArticle: (article: Article) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
    const [article, setArticle] = useState<Article | null>(null);

    return (
        <ArticleContext.Provider value={{ article, setArticle }}>
            {children}
        </ArticleContext.Provider>
    );
};

// Custom hook untuk pakai context lebih mudah
export const useArticle = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('useArticle must be used within an ArticleProvider');
    }
    return context;
};
