#include <iostream>
#include <cmath>
using namespace std;
int cf(char x)
{
	if (x == 'I')
		return(1);
	else if (x == 'X')
		return(10);
	else if (x == 'V')
		return(5);
	else if (x == 'IV')
		return(4);
	else if (x == 'L')
		return(50);
	else if (x == 'C')
		return(100);
	else if (x == 'D')
		return(500);
	else if (x == 'M')
		return(1000);
	else if (x == '0')
		return(0);
	else return(0);
}
int main()
{
	setlocale(0, "");
	string ch;
	int s = 0;
	int i = 0;
	char v = 'I';
	cout << "¬ведите число:";
	cin >> ch;
	if (ch.length() >2) {
		if (ch[0] == ch[1] and ch[0] == v and cf(ch[2]) > 1) {
			cout << "eror";
			return 0;
		}
		for (int i = 0; i < (ch.length() - 3); i++) {
			if (ch[i] == ch[i + 1] and ch[i] == v and cf(ch[i + 2]) <= 1)
			{
				cout << "Eror";
				return 0;
			}
		}
	}

	for (int i = 0; i < (ch.length()); i++) {
		
		
		if (cf(ch[i]) < cf(ch[i + 1]) and cf(ch[i]) !=0) {

			s =s+  cf(ch[i + 1]) - cf(ch[i]);
			ch[i + 1] = '0';

		}
		else s = s + cf(ch[i]); 
	}
	cout << s;
}