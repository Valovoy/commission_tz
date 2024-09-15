function roundCommission(commission) {
	return Math.ceil(commission * 100) / 100
}

module.exports = {
	roundCommission,
}
