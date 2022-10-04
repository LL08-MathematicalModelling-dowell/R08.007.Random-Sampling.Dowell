#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <time.h>
#include <algorithm>
#include <iostream>
using namespace std;

float PI = 3.14;

namespace py = pybind11;

struct Point
{
    long x, y;
};

std::vector<Point> FieldRP(int side, int selection, int choice, float value)
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

    std::vector<Point> coordinates;

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

    std::vector<Point> L;
    float i = 0.0;
    while (i <= 2 * PI)
    {
        int a = round(diameter * cos(i));
        int b = round(diameter * sin(i));
        L.push_back({a, b});
        i += PI / 6;
    }

    int selectA = coordinates[0].x;
    int selectB = coordinates[0].y;

    srand(time(0));
    while (coordinates.size() < N)
    {
        std::vector<Point> X1;
        for (int k = 0; k < L.size(); k++)
        {
            int x = L[k].x + selectA;
            int y = L[k].y + selectB;
            if (x >= -side / 2 && y >= -side / 2 && x <= side / 2 && y <= side / 2)
            {
                X1.push_back({x, y});
            }
        }

        int random = (rand() % X1.size());
        selectA = X1[random].x;
        selectB = X1[random].y;
        coordinates.push_back({selectA, selectB});
    }

    return coordinates;
}

std::vector<Point> ExcelRP(int side, int selection)
{

    int N = side;
    int area = side * side;
    int area_of_circle = area / N;
    float radius = sqrt(area_of_circle / PI);
    float diameter = 2 * radius;

    std::vector<Point> coordinates;
    std::vector<Point> XOld;
    std::vector<Point> L;
    std::vector<Point> X;

    int i;
    if (selection == 0)
    {
        i = 1;
    }
    else
    {
        i = selection;
    }

    for (int j = 1; j < side + 1; j++)
    {
        XOld.push_back({i, j});
    }

    srand(time(0));
    int random1 = (rand() % XOld.size());
    int selectA = XOld[random1].x;
    int selectB = XOld[random1].y;
    coordinates.push_back({selectA, selectB});

    float iNew = 0.0;
    while (iNew <= 2 * PI)
    {
        int a = round(diameter * cos(iNew));
        int b = diameter * sin(iNew);
        L.push_back({a, static_cast<int>(ceil(b))});
        L.push_back({a, static_cast<int>(floor(b))});
        iNew += PI / 180;
    }

    for (int j = 0; j < L.size(); j++)
    {
        if (L[j].x != L[j + 1].x || L[j].y != L[j + 1].y)
        {
            X.push_back({L[j].x, L[j].y});
        }
    }

    if (selection == 0)
    {
        for (int j = 0; j < N - 1; j++)
        {
            std::vector<Point> X1;
            for (int k = 0; k < X.size(); k++)
            {
                int x = X[k].x + selectA;
                int y = X[k].y + selectB;
                if (x == j + 2 && x >= 1 && y >= 1 && x <= side && y <= side)
                {
                    X1.push_back({x, y});
                }
            }
            int random2 = (rand() % X1.size());
            selectA = X1[random2].x;
            selectB = X1[random2].y;
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
            std::vector<Point> X1;
            for (int k = 0; k < X.size(); k++)
            {
                int x = X[k].x + selectA;
                int y = X[k].y + selectB;
                if (x >= 1 && y >= 1 && x <= side && y <= side)
                {
                    X1.push_back({x, y});
                }
            }

            int random2 = (rand() % X1.size());
            selectA = X1[random2].x;
            selectB = X1[random2].y;

            if (std::find(column_nos.begin(), column_nos.end(), selectA) != column_nos.end())
            {
            }
            else
            {
                column_nos.push_back(selectA);
                coordinates.push_back({selectA, selectB});
            }
            std::sort(column_nos.begin(), column_nos.end());
        }
    }

    return coordinates;
}

// NOTE: The name given here must match the one given in CMakeLists.txt
PYBIND11_MODULE(Random_Allocation, m)
{
    // Declare the point class
    py::class_<Point>(m, "Point")
        .def(py::init<long, long>()) // Point takes 2 longs to construct
        .def_readonly("x", &Point::x)
        .def_readonly("y", &Point::y);

    // Declare the FieldRP function
    m.def(
        "FieldRP", // Name in python
        &FieldRP,  // Address of function
        "Returns the Coordinates for Field Random Point Function");

    m.def(
        "ExcelRP", // Name in python
        &ExcelRP,  // Address of function
        "Returns the Coordinates for Excel Random Point Function");

}
