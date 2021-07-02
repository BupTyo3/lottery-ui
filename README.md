# lottery-ui

1) Контракты:
- clone https://github.com/BupTyo3/lottery-contract
- npm i
- npm install -g truffle 
- устанавливаем Ganache и запускаем 
- затем в консоле truffle migrate (деплой контрактов в Ganache)
2) Фронт:
- clone https://github.com/BupTyo3/lottery-ui/
- yarn (устанавливаем все зависимости)
- в фале contracts/lotteryInstance вставляем адрес опубликованого контакта lottery
- в фале contracts/prizePoolInstance вставляем адрес опубликованого контакта PrizePool
- yarn serve (запускает фронт)
- при первом старте подключаем кошелек метамаск, в меню admin нажимает «set platform». потом «set prize pool» потом «send gas» потом «send booster» потом стартует новый раунт «start new round»
- в разделе lottery - нажимаем play now для покупки билетов
- see more details показывает данные о раундах
