package com.example.springbootreactauth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springbootreactauth.model.Recipe;
import com.example.springbootreactauth.repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> findRecipesByMealName(String mealName) {
        return recipeRepository.findByMealNameContainingIgnoreCase(mealName);
    }
}

