function calculate_subscription() { 
	var expiryDate = document.getElementById('expiryDate').value;
	var monthsToBuy = document.getElementById('monthsToBuy').value;
	var monthlyCost = document.getElementById('monthlyCost').value;
	var annualCost = document.getElementById('annualCost').value;
	var result = document.getElementById('success_message');

	var isValid = validateFields(expiryDate, monthsToBuy, monthlyCost, annualCost, result);
	if(isValid) {
		var currExpiry = moment(expiryDate, "DD/MM/YYYY");
		var newExpiry = currExpiry.clone();
		var cost = 0;
		var date = newExpiry.date();
		if(monthsToBuy == 12) {
			newExpiry.add(1, 'year');
			if(date != 1 && date != 15) {
				if(date > 15) {
					newExpiry.startOf('month').add(1, 'month');
				} else if(date < 15) {
					newExpiry.date(15);
				}
				var daysDiff = moment(newExpiry).clone().subtract(1, 'year').diff(currExpiry, 'days');
				cost = (daysDiff * (annualCost/365)) + +annualCost;
			} else {
				cost = +annualCost;
			}
		} else {
			newExpiry.add(monthsToBuy, 'months');
			if(date != 1 && date != 15) {
				if(date > 15) {
					newExpiry.subtract(date - 15, 'days');
				} else if(date < 15) {
					newExpiry.subtract(date - 1, 'days');
				}
				var monthsDiff = newExpiry.diff(currExpiry, 'months');
				var daysDiff = moment(newExpiry).clone().subtract(monthsDiff, 'months').diff(currExpiry, 'days');
				cost = (monthsDiff * monthlyCost) + (daysDiff * (monthlyCost/30));
			} else {
				cost = monthsToBuy * monthlyCost;
			}
		}

		// display result
		result.innerHTML = "<b>New Expiry : </b>" + newExpiry.format("DD/MM/YYYY") + "<b> Cost : </b>" + cost.toFixed(2);
	}
}

function validateFields(expiryDate, monthsToBuy, monthlyCost, annualCost, result) {
	if(!(moment(expiryDate, "DD/MM/YYYY").isValid())) {
		result.innerHTML = "Invalid Date. Date should be in DD/MM/YYYY format.";
		return false;
	}
	if(monthsToBuy < 1 || monthsToBuy >12) {
		result.innerHTML = "Invalid months to buy. Months to buy should be between 1 to 12";
		return false;
	}
	if(+monthlyCost <= 0) {
		result.innerHTML = "Invalid monthly cost.";
		return false;
	}
	if(annualCost <= 0) {
		result.innerHTML = "Invalid annual cost.";
		return false;
	}
	return true;
}