"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';



interface Article {
  source: { name: string };
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  description: string;
}

export default function Insights() {
  const [articles, setArticles] = useState<Article[]>([]);
  const API_KEY = 'aad6df4eb2a64bf1b83b154f37bc581d'; // Replace with your actual API key

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?category=business&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setArticles(data.articles.slice(0, 10))) // Display only top 10 articles
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="overflow-hidden">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img
                src={article.urlToImage || '/placeholder.svg'}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="font-semibold text-red-500 mr-2">{article.source.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600">{article.description}</p>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
