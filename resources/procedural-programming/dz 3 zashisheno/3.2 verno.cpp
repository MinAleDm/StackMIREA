#include <iostream>
#include <math.h> 
using namespace std;

int main() {
	setlocale(0, "");
	float s, n, r, m, p = 0, i = -100000, m1;
	cout << "Введите сумму займа = ";
	if (cin >> s) {
		cout << "Введите сумму ежемесячного платежа = ";
		if (cin >> m) {
			cout << "Введите количество лет займа = ";
			if (cin >> n) {
				while ((-100 <= p) and (p <= 100)) {
					i++;
					p = i / 1000;
					r = p / 100;
					m1 = (s * r * pow(1 + r, n)) / (12 * (pow(1 + r, n) - 1));
					if (m1 >= m) {
						cout << "Процент займа = " << p << "%" << endl;
						break;
					}
				}
			}
			else {
				cout << "Перезапустите программу и введите число";
			}
		}
		else {
			cout << "Перезапустите программу и введите число";
		}
	}
	else {
		cout << "Перезапустите программу и введите число";
	}
	return 0;
}