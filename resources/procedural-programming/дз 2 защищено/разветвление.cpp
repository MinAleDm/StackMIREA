#include <iostream>
#include <cmath>
using namespace std;
int main() {
    setlocale(0, "");
    double x, a, w, xm;
    cout << "Введите X:" ;
    cin >> x;
    cout << "Введите A:";
    cin >> a;
    if (cin.fail()) {
        cin.clear();
        cin.ignore();
        cout << "Неправильный ввод! Перезапустите программу." << endl;
        return 0;
    }
    else {
        cout << "Числа введены." << endl;
        xm = fabs(x);
        if (x == 0) 
        {
            cout << "Eror";
            return 0;
        }
        else if (xm < 1) 
        {
            w = a * log(xm);
        }
        else if (xm >= 1) {
            if ((a - x * x) < 0) {
                cout << "Ответ: Отрицательное подкоренное выражение! Нет корней.";
                return 0;
            }
            else {
                w = sqrt(a - x * x);
            }
        }
    }
    cout << "Ответ: " << w;
    return 0;
}