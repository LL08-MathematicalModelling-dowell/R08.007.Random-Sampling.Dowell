#include <iostream>
using namespace std;
#include <cmath>
#include <vector>
#include <cstdlib>
#include <time.h>
#include <algorithm>
float PI = 3.14;

auto ExcelRP(int columns, int rows, int selection)
{
    int N = columns;
    int area = columns * rows;
    int area_of_circle = area / N;
    float radius = sqrt(area_of_circle / PI);
    float diameter = 2 * radius;

    std::vector<std::pair<int, int>> coordinates;
    std::vector<std::pair<int, int>> XOld;
    std::vector<std::pair<int, int>> L;
    std::vector<std::pair<int, int>> X;

    int i;
    if (selection == 0)
    {
        i = 1;
    }
    else
    {
        i = selection;
    }

    for (int j = 1; j < rows + 1; j++)
    {
        XOld.push_back({i, j});
    }

    srand(time(0));
    int random1 = (rand() % XOld.size());
    int selectA = XOld[random1].first;
    int selectB = XOld[random1].second;
    coordinates.push_back({selectA, selectB});

    float iNew = 0.0;
    while (iNew <= 2 * PI)
    {
        int a = round(diameter * cos(iNew));
        int b = diameter * sin(iNew);
        L.push_back({a, ceil(b)});
        L.push_back({a, floor(b)});
        iNew += PI / 180;
    }

    for (int j = 0; j < L.size(); j++)
    {
        if (L[j].first != L[j + 1].first || L[j].second != L[j + 1].second)
        {
            X.push_back({L[j].first, L[j].second});
        }
    }

    if (selection == 0)
    {
        for (int j = 0; j < N - 1; j++)
        {
            std::vector<std::pair<int, int>> X1;
            for (int k = 0; k < X.size(); k++)
            {
                int x = X[k].first + selectA;
                int y = X[k].second + selectB;
                if (x == j + 2 && x >= 1 && y >= 1 && x <= columns && y <= rows)
                {
                    X1.push_back({x, y});
                }
            }
            int random2 = (rand() % X1.size());
            selectA = X1[random2].first;
            selectB = X1[random2].second;
            coordinates.push_back({selectA, selectB});
        }
    }
    else
    {
        std::vector<int> column_nos;
        column_nos.push_back(selection);

        std::vector<int> column;
        for (int j = 1; j < N + 1; j++)
        {
            column.push_back(j);
        }
        std::sort(column.begin(), column.end());

        while (column_nos != column)
        {
            std::vector<std::pair<int, int>> X1;
            for (int k = 0; k < X.size(); k++)
            {
                int x = X[k].first + selectA;
                int y = X[k].second + selectB;
                if (x >= 1 && y >= 1 && x <= columns && y <= rows)
                {
                    X1.push_back({x, y});
                }
            }

            int random2 = (rand() % X1.size());
            selectA = X1[random2].first;
            selectB = X1[random2].second;

            if (std::find(column_nos.begin(), column_nos.end(), selectA) != column_nos.end())
            {
            }
            else
            {
                column_nos.push_back(selectA);
                coordinates.push_back({selectA, selectB});
            }
            cout << "Length of column_nos is " << column_nos.size() << "\n";
            std::sort(column_nos.begin(), column_nos.end());
        }
    }
    return coordinates;
}

int main()
{
    auto coordinates = ExcelRP(100000, 100000, 4);
    for (int k = 0; k < coordinates.size(); k++)
    {
        cout << "(" << coordinates[k].first << "," << coordinates[k].second << ")\n";
    }
    return 0;
}