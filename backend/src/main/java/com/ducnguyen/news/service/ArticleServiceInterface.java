package com.ducnguyen.news.service;

import com.ducnguyen.news.domain.Article;

import java.util.Collection;

public interface ArticleServiceInterface {
    Collection<Article> getAll();
    Article getById(Long id);
    Article create(Article article);
    Article update(Long id, Article article);
    Article deleteById(Long id);
}
