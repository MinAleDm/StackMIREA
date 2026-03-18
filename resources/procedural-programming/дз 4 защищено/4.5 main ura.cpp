#include <iostream>
#include <cmath>
using namespace std;
int main()
{
	const int size = 89, height = 23;
	char graf[height][size];
	double sinx[size];
	for (int i = 0; i < size; i++)
		sinx[i] = 10 * sin(i / 10.0);
	for (int i = 0; i < height; i++)
		for (int j = 0; j < size; j++)
			if (-1 < 10.0 - i - round(sinx[j]) and 10.0 - i - round(sinx[j]) < 1)
				graf[i][j] = '*';
			else
				graf[i][j] = ' ';
	for (int i = 0; i < height; i++) 
	{

		for (int j = 0; j < size; j++)
			cout << graf[i][j];
		cout << endl;
	}
}