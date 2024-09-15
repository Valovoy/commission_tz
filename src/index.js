const fs = require('fs')
const CommissionCalculator = require('./calculator')

fs.readFile('input.json', 'utf8', (err, data) => {
	if (err) throw err

	const transactions = JSON.parse(data)

	transactions.forEach(transaction => {
		const { date, user_type, type, operation } = transaction
		let commission = 0

		if (type === 'cash_in') {
			commission = CommissionCalculator.calculateCashIn(operation.amount)
		} else {
			commission =
				user_type === 'natural'
					? CommissionCalculator.calculateCashOutNatural(operation.amount)
					: CommissionCalculator.calculateCashOutJuridical(operation.amount)
		}

		console.log(`Commission for transaction on ${date}: ${commission} EUR`)
	})
})
