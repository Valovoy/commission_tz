const config = require('./config')
const { roundCommission } = require('./utils/rounding')

function calculatePercentage(amount, percentage) {
	return amount * (percentage / 100)
}

class CommissionCalculator {
	static calculateCashIn(amount) {
		const commission = calculatePercentage(amount, config.cashIn.percents)

		return roundCommission(Math.min(commission, config.cashIn.max))
	}

	static calculateCashOutNatural(amount) {
		const taxableAmount = Math.max(amount - config.cashOutNatural.freeLimit, 0)
		const commission = calculatePercentage(
			taxableAmount,
			config.cashOutNatural.percents
		)

		return roundCommission(commission)
	}

	static calculateCashOutJuridical(amount) {
		const commission = calculatePercentage(
			amount,
			config.cashOutJuridical.percents
		)

		return roundCommission(Math.max(commission, config.cashOutJuridical.min))
	}
}

module.exports = CommissionCalculator
