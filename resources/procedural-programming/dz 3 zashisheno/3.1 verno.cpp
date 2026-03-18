#include <iostream>
#include <math.h>
using namespace std;

int main()
{
	double S, p, n, r;
	double m, q, y;
	cout << "Vvedite S: ";
	cin >> S;
	if (S <= pow(10,9) )
	{
		cout << "VVedite p: ";
		cin >> p;
		if (p >= -1 * pow(10, 4) && p <= pow(10, 4)) 
		{
			cout << "Vvedite n: ";
			cin >> n;
			if (n >= 1 && n < pow(10, 2)&& n!=0)
			{
				if (p == 0) 
				{
					m = S / n / 12;
					cout << "Mi nashli : " << m << endl;
					return 0;
				}
				else {
					r = p / 100;
				}
					q = S * r * pow((1 + r), n);
					y = 12 * (pow(1 + r, n) - 1);
					m = q / y;
					cout << "Mi nashli:  " << m << "   - Mecyachnaya viplata.";
					return 0;
				
			}
			else 
			{
				cout << "Nevenie dannie, restart";
				return 0;
			}
		}
		else 
		{
			cout << "Dannie ne verni, perezapustite";
			return 0;
		}
	}
	else {
		cout << "Dannie ne verni, perezapustite";
		return 0;
	}
}