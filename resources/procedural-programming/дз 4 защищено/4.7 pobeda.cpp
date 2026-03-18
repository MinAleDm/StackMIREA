#include <iostream>
using namespace std;
int s = 0;
int f()
{
    s = (37 * s + 3) % 64;
    return s;
}
int main()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n + 1; ++i) {
        cout << f() << endl;
    }
    return 0;
}