import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
        });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
        });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль 
        cy.get(main_page.login_button).click(); // Нажали войти
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авт. текст есть 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
        
    })
    
    it('Восстановление пароля-логика', function () {
    
        cy.get(main_page.fogot_pass_btn).click(); // Нажали забыли пароль 
        cy.get(recovery_password_page.email).type('dmitriyakimov2296@mail.ru') // Ввели любой имейл 
        cy.get(recovery_password_page.send_button).click(); // Нажали отправить код
        
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что после идентификаци текст есть
       
    })
    
    it('Неверный пароль и верный логин', function () {
       
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio1488'); // Ввели неверный пароль 
        cy.get(main_page.login_button).click(); // Нажали войти
        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после не валидных данных. текст есть 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
        
    })
   
    it('Неверный пароль и неверный логин', function () {
      
        cy.get(main_page.email).type('german@dolnikov1488.ru'); // Ввели неверный логин
        cy.get(main_page.password).type('iLoveqastudio1488'); // Ввели неверный пароль 
        cy.get(main_page.login_button).click(); // Нажали войти
        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после не валидных данных. текст есть 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
        
    })

    it('Ошибка в валидации', function () {
       
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели невалидный логин без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль 
        cy.get(main_page.login_button).click(); // Нажали войти
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после не валидных данных. текст есть 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
        
    })

    it('Привидение к строчным буквам в логине', function () {
      
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели строчный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль 
        cy.get(main_page.login_button).click(); // Нажали войти
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что авторизация успешна и текст есть 
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
       
    })

})

