#include <iostream>
#include <fstream>
#include <conio.h>
using namespace std;

ifstream ifile;
char bukvi[20]{ 'b', 'd', 'c', 'f', 'g',
               'h', 'j', 'k', 'l', 'm',
               'n', 'p', 'q', 'r', 's',
               't', 'v', 'w', 'x', 'z' };
int kol[20]{};

int main()
{
    int max = 0, num;
    char c, a = 'a';
    ifile.open("123.txt");
    if (ifile.is_open())
    {
        cout << "okey...";
        _getch();

        for (int i = 0; i < 20; i++)
        {
            kol[i] = 0;
        }

        while (ifile.get(c))
        {
            if (c == 'b') { kol[0] += 1; }
            else if (c == 'd') { kol[1] += 1; }
            else if (c == 'c') { kol[2] += 1; }
            else if (c == 'f') { kol[3] += 1; }
            else if (c == 'g') { kol[4] += 1; }
            else if (c == 'h') { kol[5] += 1; }
            else if (c == 'j') { kol[6] += 1; }
            else if (c == 'k') { kol[7] += 1; }
            else if (c == 'l') { kol[8] += 1; }
            else if (c == 'm') { kol[9] += 1; }
            else if (c == 'n') { kol[10] += 1; }
            else if (c == 'p') { kol[11] += 1; }
            else if (c == 'q') { kol[12] += 1; }
            else if (c == 'r') { kol[13] += 1; }
            else if (c == 's') { kol[14] += 1; }
            else if (c == 't') { kol[15] += 1; }
            else if (c == 'v') { kol[16] += 1; }
            else if (c == 'w') { kol[17] += 1; }
            else if (c == 'x') { kol[18] += 1; }
            else if (c == 'z') { kol[19] += 1; }
        }

        for (int i = 0; i < 20; i++)
        {
            if (max < kol[i])
            {
                max = kol[i];
                num = i;
            }
        }

        if (num == 0) { a = 'b'; }
        else if (num == 1) { a = 'd'; }
        else if (num == 2) { a = 'c'; }
        else if (num == 3) { a = 'f'; }
        else if (num == 4) { a = 'g'; }
        else if (num == 5) { a = 'h'; }
        else if (num == 6) { a = 'j'; }
        else if (num == 7) { a = 'k'; }
        else if (num == 8) { a = 'l'; }
        else if (num == 9) { a = 'm'; }
        else if (num == 10) { a = 'n'; }
        else if (num == 11) { a = 'p'; }
        else if (num == 12) { a = 'q'; }
        else if (num == 13) { a = 'r'; }
        else if (num == 14) { a = 's'; }
        else if (num == 15) { a = 't'; }
        else if (num == 16) { a = 'v'; }
        else if (num == 17) { a = 'w'; }
        else if (num == 18) { a = 'x'; }
        else if (num == 19) { a = 'z'; }

        cout << "\n" << max << " [" << a << "]";
    }
    else
    {
        cout << "ne okey...";
        _getch();
        exit(0);
    }
}