#include <iostream>
#include <cmath>
#define M_PI 3.1415926535897932384626433832795

using namespace std;
// ПП 2020 file pdf Линейный алгоритм 

//ниже сделанные правильно
void zadanie1() {
	//Задние 1
	double x, y;
	double z1, z2, z3, z4, z5, z6, z7, z8, z9, z10;
	cout << "ВВедите X" << endl;
	cin >> x;
	cout << "ВВедите Y" << endl;
	cin >> y;

	//номер а из 1
	z1 = pow(tan(abs(x * y + 1)), 2) - pow(2, -abs(x * y + 1));
	cout << z1 << " - Задание а" << endl;

	//номер б из 1
	z2 = log2(1 + abs(x + y - 1)) - acos(1 / (1 + abs(x + y - 1)));
	cout << z2 << " - Задание б" << endl;

	//номер в из 1
	z3 = pow(5, -abs(x - y) - 2 * y * 1 / (tan((abs(x - y) / (x + y)))));
	cout << z3 << " - Задание в" << endl;

	//номер г из 1
	z4 = pow(sin(x * y - x - y), 2) - pow(3, (x + y - x * y));
	cout << z4 << " - задание г" << endl;

	//номер д из 1
	z5 = pow(log10(1 + abs(x * y)), 3) - 2 * tan(2 / (1 + abs(x * y)));
	cout << z5 << " - задание д" << endl;

	//номер е из 1
	z6 = pow(2 * cos(x + 5 * y), -3 * sin(x + 5 * y)) - exp(-x - 5*y);
	cout << z6 << " - задание е" << endl;

	//номер ж из 1 
	z7 = (1 / tan(1 + abs(x + y))) - pow(1 + abs(x + y), 3);
	cout << z7 << " - задание ж" << endl;

	//номер з из 1
	z8 = pow(tan(abs((x * y) - 1)), -sin(abs((x * y) - 1)));
	cout << z8 << " - задание з" << endl;

	//номер и из 1
	z9 = asin(1 / (abs(x + y))) - exp(-2 - abs(x + y));
	cout << z9 <<" - задание и" << endl;

	//номер к из 1
	z10 = sin(2 * abs(x) + y) - pow(3, -2 * abs(x) - y);
	cout << z10 << " - задание к" << endl;

	cout << "Номер 1 сделан.";
}
void zadanie2() {
	double x, y, z;
	cout << "Введите x"<< endl;
	cin >> x;
	cout << "Введите y"<< endl;
	cin >> y;
	cout << "Введите z" << endl;
	cin >> z;
	double a, b;

	a = (2 * cos(x - M_PI / 6)) / (0.5 + pow(sin(y), 2));
	b = 1 + ((pow(z, 2)) / (3 + (pow(z, 2) / 5)));
	cout << "Число a = " << a << endl;
	cout << "Число b = " << b << endl;
	cout << "Задание 2 сделано.";
}
void zadanie3() {
	double x, y, z;
	cout << "Введите x" << endl;
	cin >> x;
	cout << "Введите y" << endl;
	cin >> y;
	cout << "Введите z" << endl;
	cin >> z;
	double a, b;

	a = y + (x / (pow(y, 2) + abs((pow(x, 2)) / (y + (pow(x, 3) / 3)))));
	b = 1 + pow(tan(z / 2), 2);
	cout << "Число a = " << a << endl;
	cout << "Число b = " << b << endl;
	cout << "Задание 3 сделано.";
}
void zadanie4(){
	double x, y, z;
	cout << "Введите x" << endl;
	cin >> x;
	cout << "Введите y" << endl;
	cin >> y;
	cout << "Введите z" << endl;
	cin >> z;
	double a, b;

	a = (1 + y) * ((x + y / (pow(x, 2) + 4)) / (exp(-x - 4) + 1 / (pow(x, 2) + 4)));
	b = (1 + cos(y - 2)) / (pow(x, 4) / 4 + pow(sin(z), 4));
	cout << "Число a = " << a << endl;
	cout << "Число b = " << b << endl;
	cout << "Задание 4 сделано.";
}		
void zadanie5() {
	float x = 11, x1, x2, x3 = 15, x4;
	cout << "9 экземпляров одной книги стоят 11 рублей и несколько копеек, 13" << endl <<
		"экземпляров этой же книги стоят 15 рублей и несколько копеек.Сколько стоит" << endl <<
		"один экземпляр книги ? " << endl;
	cout << "i chto dalshe" << endl;
	x1 = x / 9;
	x2 = x3 / 13;
	x4 = (x1 + x2) / 2;
	cout << "Ne rabotaet ya hz " << x4;
} 
void zadanie7() {
	int god;
	cout << "Введите год:" << endl;
	cin >> god;
	if (god > 0 and god <10000) {
		god = god / 100;
		god++;
		cout << "Век: " << god << endl;
	}
	else {
		cout << 'Eror' << endl;
	}

}
//тут траблы
void zadanie6() {

	double a;
	cin >> a;
	//пункт а
	double c1 = a * a;
	double a31 = c1 * a;//число в 3
	double f1 = a31 * c1;
	double a101 = f1 * f1;//число в 10 

	//пункт б
	double q2 = a * a;
	double a42 = q2 * q2;
	double a82 = a42 * a42;
	double a162 = a82 * a82;
	double a202 = a162 * a42;

	//пункт в
	double a23 = a * a;
	double a33 = a23 * a;
	double a53 = a33 * a23;
	double a103 = a53 * a53;
	double a133 = a103 * a33;

	//пункт г
	double a24 = a * a;
	double a34 = a24 * a;
	double a54 = a34 * a24;
	double a104 = a54 * a54;
	double a194 = a104 * a54 * a34 * a;//надо подумать

	//пункт д
	double a25 = a * a;
	double a35 = a25 * a;
	double a55 = a35 * a25;
	double a105 = a55 * a55;
	double a155 = a105 * a55;
	double a175 = a155 * a25;

	//пункт е
	double a26, a46, a86, a126,a246,a286;
	a26 = a * a;
	a46 = a26 * a26;
	a86 = a46 * a46;
	a126 = a86 * a46;
	a246 = a126 * a126;
	a286 = a246 * a26;
}
void zadanie8() {
	double V, T, g=9.8, alpha;
	cout << "Введите время полета : " << endl;
	cin >> T;
	cout << "Введите скорость: " << endl;
	cin >> V;
	alpha = asin(g * T / 2 * V);
	cout << "Угол равен: " << alpha << endl;//wtf?

}


void zadanie9() {
	cout << "pause";

}


int main() {
	setlocale(0, "");
	int nomer;
	cout << "Введите номер задания:" << endl;
	cin >> nomer;
	if (nomer == 1) {
		zadanie1();
	}
	else if (nomer == 2) {
		zadanie2();
	}
	else if (nomer == 3) {
		zadanie3();
	}
	else if (nomer == 4) {
		zadanie4();
	}
	else if (nomer == 5) {
		zadanie5();
	}
	else if (nomer == 6) {
		zadanie6();
	}
	else if (nomer == 7) {
		zadanie7();
	}
	else if (nomer == 777) {
		return 0;
	}
	else if (nomer == 8) {
		zadanie8();
	}
	else 
	{
		cout << "Такого нет, введите другой! ";
		cout << "Если хотите выйти нажмите 777. ";
		main();
	}
}