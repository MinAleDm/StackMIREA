#include <iostream>
#include <cmath>//CMLXXXII
#include <string>
using namespace std;
int cf(char x)
{
	if (x == '1')
		return(1);
	else if (x == '2')
		return(2);
	else if (x == '3')
		return(3);
	else if (x == '4')
		return(4);
	else if (x == '5')
		return(5);
	else if (x == '6')
		return(6);
	else if (x == '7')
		return(7);
	else if (x == '8')
		return(8);
	else if (x == '9')
		return(9);
	else if (x == '0')
		return(0);
	else if (x == 'A')
		return(10);
	else if (x == 'B')
		return(11);
	else if (x == 'C')
		return(12);
	else if (x == 'D')
		return(13);
	else if (x == 'E')
		return(14);
	else if (x == 'F')
		return(15);
	else if (x == 'G')
		return(16);
	else if (x == 'H')
		return(17);
	else if (x == 'I')
		return(18);
	else if (x == 'J')
		return(19);
	else if (x == 'K')
		return(20);
	else if (x == 'L')
		return(21);
	else if (x == 'M')
		return(22);
	else if (x == 'N')
		return(23);
	else if (x == 'O')
		return(24);
	else if (x == 'P')
		return(25);
	else if (x == 'Q')
		return(26);
	else if (x == 'R')
		return(27);
	else if (x == 'S')
		return(28);
	else if (x == 'T')
		return(29);
	else if (x == 'U')
		return(30);
	else if (x == 'V')
		return(31);
	else if (x == 'W')
		return(32);
	else if (x == 'X')
		return(33);
	else if (x == 'Y')
		return(34);
	else if (x == 'Z')
		return(35);
}
int bk(char x) {
	if (x == 10)
		return('A');
	else if (x == 11)
		return('B');
	else if (x == 12)
		return('C');
	else if (x == 13)
		return('D');
	else if (x == 14)
		return('E');
	else if (x == 15)
		return('F');
	else if (x == 16)
		return('G');
	else if (x == 17)
		return('H');
	else if (x == 18)
		return('I');
	else if (x == 19)
		return('J');
	else if (x == 20)
		return('K');
	else if (x == 'L')
		return(21);
	else if (x == 'M')
		return(22);
	else if (x == 'N')
		return(23);
	else if (x == 'O')
		return(24);
	else if (x == 'P')
		return(25);
	else if (x == 'Q')
		return(26);
	else if (x == 'R')
		return(27);
	else if (x == 'S')
		return(28);
	else if (x == 'T')
		return(29);
	else if (x == 'U')
		return(30);
	else if (x == 'V')
		return(31);
	else if (x == 'W')
		return(32);
	else if (x == 'X')
		return(33);
	else if (x == 'Y')
		return(34);
	else if (x == 'Z')
		return(35);
	else return(0);
}
int main()
{
	setlocale(0, "");
	string ch, otv = "";
	string vr;
	long int s = 0, p = 4000, o, e, n, d = 0, pr;
	cout << "ВВедите нашу сс";
	cin >> e;
	cout << "ВВедите необходимую сс";
	cin >> n;
	cout << "ВВедите число";
	cin >> ch;
	if (e == n) {
		cout << ch;
		return 0;
	}
	for (int i = 0; i < ch.length(); i++) {
		if (cf(ch[i]) >= e) {
			cout << "Error";
			return 0;
		}
		d += cf(ch[i]) * pow(e, ch.length() - i - 1);

	}
	if (n == 10) {
		cout << d << endl;
	}
	else {
		int i = 0;
		while (d >= n)
		{
			pr = d % n;
			d /= n;
			if (pr > 9) {
				otv += bk(pr);
			}
			else
			{
				vr = to_string(pr);
				otv += vr;
			}
			i++;
		}
		i++;
		if (d > 9) {
			otv += bk(d);
		}
		else {
			vr = to_string(d);
			otv += vr;
		}
	}
	reverse(otv.begin(), otv.end());
	cout << otv;

}
