#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include <algorithm> 
using namespace std;
int main() {
	double maks=-90, mensh=9999, maksk=-90, menshk=990, obsh, obshk, obshd,x1,x2,x3,x4,x5=0,x6=0;
	double a[3][4] = { 5,2,0,10,3,5,2,5,20,0,0,0 }, b[4][2] = { 1.20,0.50,2.80,0.40,5,1,2,1.5 }, c[3][2] = {0};
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 4; j++) {
			c[i][0] += a[i][j] * b[j][0];
			c[i][1] += a[i][j] * b[j][1];
		}
	}

	for (int i = 0; i < 3; i++) {
		if (maks < c[i][0]) {
			maks = c[i][0];
			x1 = i;
		}
		if (mensh > c[i][0]) {
			mensh = c[i][0];
			x2 = i;
		}
		if (maksk < c[i][1]) {
			maksk = c[i][1];
			x3 = i;
		}
		if (menshk > c[i][1]) {
			menshk = c[i][1];
			x4 = i;
		}
		x5 += c[i][0];
		x6 += c[i][1];


		for (int j = 0; j < 2; j++) {
			cout << c[i][j]<<" ";
		}
		cout << endl;
	}
	cout << "1) " << x1 + 1 << " " << x2 + 1 << endl;
	cout << "2) " << x3 + 1 << " " << x4 + 1 << endl;
	cout << "3) " << x5 << endl;
	cout << "4) " << x6 << endl;
	cout << "5) " << x5+x6 << endl;

}