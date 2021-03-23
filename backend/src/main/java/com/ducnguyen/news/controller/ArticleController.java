package com.ducnguyen.news.controller;

import com.ducnguyen.news.exception.ResourceNotFoundException;
import com.ducnguyen.news.model.Article;
import com.ducnguyen.news.repository.ArticleRepository;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController implements ControllerInterface<Article> {
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public ResponseEntity<Page<Article>> getAllCustomized(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(articleRepository.findAllCustomized(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Article>> getAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(articleRepository.findAll(PageRequest.of(pageNumber, pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending())),
                HttpStatus.OK);
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
        article.setCategory(articleToUpdate.getCategory());
        return new ResponseEntity<>(articleRepository.save(article), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            articleRepository.deleteById(id);
            jsonObject.put("message", "Article deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getAllCategories() {
        TreeSet<String> treeSet = new TreeSet<>(Arrays.asList("Technology", "Science", "Entertainment", "Health",
                "Business", "Politics"));
        return new ResponseEntity<Set<String>>(treeSet, HttpStatus.OK);
    }
}
