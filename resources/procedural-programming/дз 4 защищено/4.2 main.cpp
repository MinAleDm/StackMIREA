#include <iostream>
#include <cmath>

using namespace std;
void ptt(double S){
	
	if (S > 0)
	{
		cout << 1;
	}
	else if (S == 0)
	{
		cout << 0;
	}
	else
	{
		cout << -1;
	}
}

int main()
{
	setlocale(0, "");
	double S;
	cout << "¬ведитe число: " << endl;
	if (cin >> S)
	{
		ptt(S);
	}
	else
	{
		cout << "¬водите цифры";
	}
}