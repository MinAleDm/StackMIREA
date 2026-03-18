#include <iostream>
#include <algorithm>
using namespace std;
int main() {
	int a, b;
	cin >> a;
	for(int j=3;j<=a;j++){
		b = 0;
		for (int i = j-1; i > 1; i--) {
			if (j % i==0) {
				b = 1;
			}
			}
		if (b == 0) {
			cout << j<<" ";
		}
	}
}