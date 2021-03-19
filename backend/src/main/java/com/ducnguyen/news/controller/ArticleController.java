package com.ducnguyen.news.controller;

import com.ducnguyen.news.exception.ResourceNotFoundException;
import com.ducnguyen.news.model.Article;
import com.ducnguyen.news.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController implements ControllerInterface<Article> {
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public ResponseEntity<Collection<Article>> getAll() {
        return new ResponseEntity<>(articleRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> getById(Long id) {
        Article article =
                articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article " + id + " " +
                        "not found!"));
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> create(Article article) {
        return new ResponseEntity<>(articleRepository.save(article), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Article> update(Long id, Article articleToUpdate) {
        Article article =
                articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article " + id + " " +
                        "not found!"));
        article.setAuthor(articleToUpdate.getAuthor());
        article.setTitle(articleToUpdate.getTitle());
        article.setCoverPhotoURL(articleToUpdate.getCoverPhotoURL());
        article.setContent(articleToUpdate.getContent());
        return new ResponseEntity<>(articleRepository.save(article), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Article> deleteById(Long id) {
        Article article =
                articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article " + id + " " +
                        "not found!"));
        articleRepository.delete(article);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(articleRepository.save(article), HttpStatus.OK);
    }
}
