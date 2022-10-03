#include <iostream>
using namespace std;
#include <cmath>
#include <vector>
#include <cstdlib>
#include <time.h>
float PI = 3.14;

auto FieldRP(int side, int selection, int choice, float value)
{
    int area = side * side;
    float radius;
    int N;
    if (choice == 0)
    {
        N = static_cast<int>(value);
        int area_of_circle = area / N;
        radius = sqrt(area_of_circle / PI);
    }
    else if (choice == 1)
    {
        radius = value;
        int area_of_circle = PI * radius * radius;
        N = round(area / area_of_circle);
    }
    else
    {
    }
    float diameter = 2 * radius;
    std::vector<std::pair<int, int>> coordinates;

    if (selection == 1)
    {
        coordinates.push_back({0, 0});
    }
    if (selection == 2)
    {
        coordinates.push_back({-side / 2, side / 2});
    }
    if (selection == 3)
    {
        coordinates.push_back({-side / 2, 0});
    }
    if (selection == 4)
    {
        coordinates.push_back({-side / 2, -side / 2});
    }
    if (selection == 5)
    {
        coordinates.push_back({0, -side / 2});
    }
    if (selection == 6)
    {
        coordinates.push_back({side / 2, -side / 2});
    }
    if (selection == 7)
    {
        coordinates.push_back({side / 2, 0});
    }
    if (selection == 8)
    {
        coordinates.push_back({side / 2, side / 2});
    }
    if (selection == 9)
    {
        coordinates.push_back({0, side / 2});
    }

    std::vector<std::pair<int, int>> L;
    float i = 0.0;
    while (i <= 2 * PI)
    {
        int a = round(diameter * cos(i));
        int b = round(diameter * sin(i));
        L.push_back({a, b});
        i += PI / 6;
    }

    int selectA = coordinates[0].first;
    int selectB = coordinates[0].second;

    srand(time(0));
    while (coordinates.size() < N)
    {
        std::vector<std::pair<int, int>> X1;
        for (int k = 0; k < L.size(); k++)
        {
            int x = L[k].first + selectA;
            int y = L[k].second + selectB;
            if (x >= -side / 2 && y >= -side / 2 && x <= side / 2 && y <= side / 2)
            {
                X1.push_back({x, y});
            }
        }

        int random = (rand() % X1.size());
        selectA = X1[random].first;
        selectB = X1[random].second;
        coordinates.push_back({selectA, selectB});
    }

    return coordinates;
}

// int main()
// {
//     int a, b, c, d;
//     cin >> a >> b >> c >> d;
//     auto coordinates = FieldRP(a, b, c, d);
//     for (int k = 0; k < coordinates.size(); k++)
//     {
//         cout << "(" << coordinates[k].first << "," << coordinates[k].second << ")\n";
//     }
//     return 0;
// }
