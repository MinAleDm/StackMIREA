#include <iostream>
using namespace std;
string Name;
int main(){
    cout << "what is your name:";
    if (cin >> Name)
    {
        cout << "Ваше имя:" << Name;
    }
    else
    {
        cout << "Eror";
    }
    return 0;
}