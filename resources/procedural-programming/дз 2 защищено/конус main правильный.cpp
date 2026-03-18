#include <iostream>
#include <math.h>
#include <cmath>
using namespace std;

int main()
{
    int l;
    int pi = 3.14;
    float R, r, h, V, S;
    cout << "Enter h: ";
    if (cin >> h && h >= 0)
    {
        cout << "Enter r: ";
        if (cin >> r && r >= 0)
        {
            cout << "Enter R: ";
            if (cin >> R && R >= 0)
            {
                l = sqrt(h * h + (R - r) * (R - r));
                pi = 3.14;
                V = (((pi * h) / 3) * (R * R + r * R + r * r));
                S = (pi * (R * R + (R + r) * l + (r * r)));
                cout << "V: " << V << "\n";
                cout << "S: " << S;
            }
            else
            {
                cout << "Immposible";
                return 0;
            }
        }
        else
        {
            cout << "Immposible";
            return 0;
        }
    }
    else
    {
        cout << "Immposible";
        return 0;
    }
}