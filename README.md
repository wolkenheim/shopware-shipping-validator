# Shopware Shipping Testing

Simple typescript tool to verify correct shipping configuration and calculation for Shopware 6.3.

Let´s be honest: Shipping methods can get quite complex with the Rule builder, various countries, tax status and more. At the end it becomes tedious to manually QA and test the configuration. Especially if you have 30+ countries with different shipping rates. I needed a simple tool to verify weight based shipping in this scenario.

This gets complex as well quickly. Wouldn´t it nice if that tool could create test users and test products programmatically? What about different sales channels? What about variants? And so on.

At the end this gets so complex this could be a full blown tool with UI and database. And then it the end maybe it would be an idea to create testing rules via an UI. 

Let´s keep it simple. It´s much easier to create your test users manually once and use real products that might never changed.

```
mv src/config.default.ts src/config.ts
npm install
```

You need to insert some data in src/config.ts. 
Then pick your testing commands from package.json and run them. This is a pure testing tool based on ts-jest so no build or dev.
