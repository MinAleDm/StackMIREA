#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    double q,a, sum = 0;
    int i = 0;
    ofstream file("1.txt");
    setlocale(0, "");
    cout << "¬ведите 10 чисел:"<< endl;
    while(i<10)
    {
        if (cin >> q) {
            i++;
            file << q << endl;
        }
        else
        {
            cout << "¬водите только числа";
            return 0;
        }
    }
    file.close();

    ifstream fin("1.txt");
     while (fin >> a)
     {
        sum += a;
     } 
     cout << "—умма=" << sum;
     fin.close();
}