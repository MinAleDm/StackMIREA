#include <iostream>
#include <math.h>
#include <cmath>
using namespace std;

int main()
{
    float x, y, b, z; 
    int j, u;
    cout << "Enter B: ";
    if (cin >> b)
    {
        cout << "Enter X: ";
        if (cin >> x)
        {
            cout << "Enter Y: ";
            if (cin >> y)
            {
                j = b - y;
                u = b - x;
                if (j > 0)
                {
                    if (u != 0) {
                        z = log(j) * sqrt(u);
                        cout << "Answer: " << z;
                        return 0;
                    }
                    else if (u=0)
                    {
                        cout << "Net resh";
                    }
                }
                else
                {
                    cout << "Net resh";
                    return 0;
                }
            }
            else
            {
                cout << "Eror";
                return 0;
            }
        }
        else
        {
            cout << "Eror";
            return 0;
        }
    }
    else
    {
        cout << "Eror";
        return 0;
    }
}