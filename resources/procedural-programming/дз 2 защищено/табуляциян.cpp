#include <stdlib.h>
#include <math.h>
#include <iostream>
using namespace std;

int main() {
	setlocale(0, "");
	double y;
	for (double x = -4; x <= 0; x = x + 0.5) {
		y = (((x * x) - 2 * x + 2) / (x - 1));
		cout << "Ответ для x = " << x << " y = "<< y << endl;
	}
	cout << "Ответ для х = 1 Невозможен" << endl;
	for (double x = 1.5; x <= 4; x = x + 0.5) {
		y = (((x * x) - 2 * x + 2) / (x - 1));
		cout << "Ответ для x = " << x << " y = " << y << endl;
	}
	return 0;
}