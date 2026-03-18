#include <iostream>
#include <vector>
using namespace std;

bool hasFixedPoint(const vector<int>& balls) {
    for (int i = 0; i < static_cast<int>(balls.size()); ++i) {
        if (balls[i] == i + 1) {
            return true;
        }
    }
    return false;
}

void generatePermutations(int position, vector<int>& balls, long long& count) {
    if (position == static_cast<int>(balls.size())) {
        if (hasFixedPoint(balls)) {
            ++count;
        }
        return;
    }

    for (int i = position; i < static_cast<int>(balls.size()); ++i) {
        swap(balls[position], balls[i]);
        generatePermutations(position + 1, balls, count);
        swap(balls[position], balls[i]);
    }
}

int main() {
    int n;
    cin >> n;

    if (n <= 0) {
        cout << "Некорректное количество шариков";
        return 0;
    }

    vector<int> balls(n);
    for (int i = 0; i < n; ++i) {
        balls[i] = i + 1;
    }

    long long count = 0;
    generatePermutations(0, balls, count);
    cout << count;
    return 0;
}
