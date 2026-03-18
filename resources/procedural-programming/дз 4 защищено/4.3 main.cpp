#include <iostream>
#include <cmath>
using namespace std;
void prog1() {
	double a, b;
	cout << "Введите сторону а и сторону б";
	cin >> a;
	cin >> b;
	cout << "S=" << a * b;
}
void prog2() {
	double a, h;
	cout << "Введите сторону а и высоту";
	cin >> a ;
	cin >> h;
	cout << "S=" << 0.5 * a * h;
}
void prog3() {
	double r;
	cout << "Введите радиус";
	cin >> r;
	cout << "S=" << 3.14 * r * r;
}

int main()
{
	setlocale(0, "");
	string S;
	cout << "Что делаем? КАкая фигура?"<<endl << "prog1 - прямоугольник, prog2 - треугольник, prog3 - круг: " << endl;
	cin >> S;
	if (S == "prog1")
	{

		prog1();
	}
	else if (S == "prog2")
	{

		prog2();
	}
	else if (S == "prog3")
	{

		prog3();
	}

}

