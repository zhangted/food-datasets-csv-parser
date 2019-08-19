- [ ] Do we have that json version for different countries ready or only csv?
it's strange

- [ ] COnfigure ESLint/Husky/Lint-staged

```
"lint-staged": {
  "linters": {
    "*.js": [
      "npm run clean",
      "git add"
    ]
  },
  "ignore": [
    "**/dist/*.js"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
```

- [ ] Check if we need Utils with all that functionality inside at all?
