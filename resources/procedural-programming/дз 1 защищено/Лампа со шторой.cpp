#include <iostream>
using namespace std;
int Num, a, b, c;

int main()
{
    cout << "1 - Yes, 2 - no" << "\n";
    cout << "Is it day? (1 or 2): ";
    cin >> a;
    if ((a == 1) || (a == 2))
    {

    }
    else
    {
        cout << "Error";
        return 0;
    }
    cout << "Window opened? (1 or 2): ";
    cin >> b;
    if (b == 1 || b == 2)
    {

    }
    else
    {
        cout << "Error";
        return 0;
    }
    cout << "Lamp working? (1 or 2): ";
    cin >> c;
    if (c == 1 || c == 2)
    {

    }
    else
    {
        cout << "Error";
        return 0;
    }
    if (c == 1)
    {
        cout << "Light";
    }
    else
    {
        if (b == 1)
        {
            if (a == 1)
            {
                cout << "Light";
            }
            else
            {
                cout << "Light";
            }
        }
        else
        {
            cout << "Dark";
        }
    }
}
