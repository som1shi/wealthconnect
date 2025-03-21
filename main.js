document.addEventListener('DOMContentLoaded', function() {
    // Debt Payoff Chart
    const debtPayoffCtx = document.getElementById('debtPayoffChart').getContext('2d');
    const debtPayoffChart = new Chart(debtPayoffCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Actual Debt',
                data: [28000, 27250, 26700, 26200, 25500, 24850, null, null, null, null, null, null],
                borderColor: '#0071cd',
                backgroundColor: 'rgba(0, 113, 205, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }, {
                label: 'Projected Debt',
                data: [28000, 27250, 26700, 26200, 25500, 24850, 24000, 23200, 22300, 21500, 20600, 19800],
                borderColor: 'rgba(0, 113, 205, 0.5)',
                borderWidth: 2,
                tension: 0.4,
                borderDash: [5, 5],
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Debt Amount ($)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Debt Breakdown Chart
    const debtBreakdownCtx = document.getElementById('debtBreakdownChart').getContext('2d');
    const debtBreakdownChart = new Chart(debtBreakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Student Loans', 'Credit Cards', 'Auto Loan'],
            datasets: [{
                data: [12500, 5350, 7000],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            cutout: '70%'
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
}); 