# lottery-ui

1) Контракты:
- clone https://github.com/BupTyo3/lottery-contract
- npm i
- npm install -g truffle 
- устанавливаем Ganache (https://www.trufflesuite.com/ganache) и запускаем 
- затем в консоле truffle migrate (деплой контрактов в Ganache)
- в браузере должен быть установлен и настроен кошёк Metamask подключённый к Ganache (https://www.youtube.com/watch?v=nUEBAS5r4Og)
2) Фронт:
- clone https://github.com/BupTyo3/lottery-ui/
- yarn (устанавливаем все зависимости)
- в фале contracts/lotteryInstance вставляем адрес опубликованого контакта lottery
- в фале contracts/prizePoolInstance вставляем адрес опубликованого контакта PrizePool
- yarn serve (запускает фронт)
- при первом старте подключаем кошелек метамаск, в меню admin нажимает «set platform». потом «set prize pool» потом «send gas» потом «send booster» потом стартует новый раунт «start new round»
- в разделе lottery - нажимаем play now для покупки билетов
- see more details показывает данные о раундах
