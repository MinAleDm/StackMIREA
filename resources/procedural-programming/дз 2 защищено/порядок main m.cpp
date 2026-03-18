#include <iostream>
#include <math.h>
#include <cmath>
using namespace std;

int main()
{
    int N, N10;
    cout << "Enter N: ";
    if (cin >> N)
    {
        N10 = N + 10;

        while (N != N10)
        {
            cout << N << ", ";
            N = N + 1;
        }
    }
    else
    {
        cout << "Eror";
        return 0;
    }
}