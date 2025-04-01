  remainingAmount: 5350,
  percentPaid: 20
},
autoLoan: {
  totalAmount: 7000,
  interestRate: 4.2,
  monthlyPayment: 400,
  paidAmount: 10500,
  remainingAmount: 7000,
  percentPaid: 60
}
};

try {
  // If we have student loans data
  if (rawData.studentLoans || rawData.student_loans) {
    const studentData = rawData.studentLoans || rawData.student_loans;
    defaultData.studentLoans = {
      totalAmount: parseFloat(studentData.totalAmount || studentData.total_amount || studentData.amount || defaultData.studentLoans.totalAmount),
      interestRate: parseFloat(studentData.interestRate || studentData.interest_rate || studentData.rate || defaultData.studentLoans.interestRate),
      monthlyPayment: parseFloat(studentData.monthlyPayment || studentData.monthly_payment || studentData.payment || defaultData.studentLoans.monthlyPayment),
      paidAmount: parseFloat(studentData.paidAmount || studentData.paid_amount || studentData.paid || defaultData.studentLoans.paidAmount),
      remainingAmount: parseFloat(studentData.remainingAmount || studentData.remaining_amount || studentData.remaining || defaultData.studentLoans.remainingAmount),
      percentPaid: parseFloat(studentData.percentPaid || studentData.percent_paid || studentData.progress || defaultData.studentLoans.percentPaid)
    };
  }

  // If we have credit cards data
  if (rawData.creditCards || rawData.credit_cards) {
    const creditData = rawData.creditCards || rawData.credit_cards;
    defaultData.creditCards = {
      totalAmount: parseFloat(creditData.totalAmount || creditData.total_amount || creditData.amount || defaultData.creditCards.totalAmount),
      interestRate: parseFloat(creditData.interestRate || creditData.interest_rate || creditData.rate || defaultData.creditCards.interestRate),
      monthlyPayment: parseFloat(creditData.monthlyPayment || creditData.monthly_payment || creditData.payment || defaultData.creditCards.monthlyPayment),
      paidAmount: parseFloat(creditData.paidAmount || creditData.paid_amount || creditData.paid || defaultData.creditCards.paidAmount),
      remainingAmount: parseFloat(creditData.remainingAmount || creditData.remaining_amount || creditData.remaining || defaultData.creditCards.remainingAmount),
      percentPaid: parseFloat(creditData.percentPaid || creditData.percent_paid || creditData.progress || defaultData.creditCards.percentPaid)
    };
  }

  // If we have auto loan data
  if (rawData.autoLoan || rawData.auto_loan) {
    const autoData = rawData.autoLoan || rawData.auto_loan;
    defaultData.autoLoan = {
      totalAmount: parseFloat(autoData.totalAmount || autoData.total_amount || autoData.amount || defaultData.autoLoan.totalAmount),
      interestRate: parseFloat(autoData.interestRate || autoData.interest_rate || autoData.rate || defaultData.autoLoan.interestRate),
      monthlyPayment: parseFloat(autoData.monthlyPayment || autoData.monthly_payment || autoData.payment || defaultData.autoLoan.monthlyPayment),
      paidAmount: parseFloat(autoData.paidAmount || autoData.paid_amount || autoData.paid || defaultData.autoLoan.paidAmount),
      remainingAmount: parseFloat(autoData.remainingAmount || autoData.remaining_amount || autoData.remaining || defaultData.autoLoan.remainingAmount),
      percentPaid: parseFloat(autoData.percentPaid || autoData.percent_paid || autoData.progress || defaultData.autoLoan.percentPaid)
    };
  }

  return defaultData;
} catch (error) {
  console.error('Error processing extracted data:', error);
  return defaultData;
} 