#include <iostream>
using namespace std;
string Name;int a, b, d;
int main() {
    cout << "Enter first number: " << "\n";
    if (cin >> a)
    {
        cout << "Enter second number: " << "\n";
        if (cin >> b)
        {
            cout << "What to do: +, -, *, /: " << "\n";
            if (cin >> Name)
            {
                if (Name == "+")
                {
                    d = a + b;
                    cout << "Answer: " << d;
                }
                else if (Name == "-")
                {
                    d = a - b;
                    cout << "Answer: " << d;
                }
                else if (Name == "*")
                {
                    d = a * b;
                    cout << "Answer: " << d;
                }
                else if (Name == "/")
                {
                    if (b == 0)
                    {
                        cout << "Error";
                    }
                    else
                    {
                        d = a / b;
                        cout << "Answer: " << d;
                    }
                }
                else
                {
                    cout << "Only: +, -, *, /";
                }
            }
            else
            {
                cout << "Error";
                
            }
        }
        else
        {
            cout << "Error";
            
        }
    }
    else
    {
        cout << "Error";
        
    }
}
