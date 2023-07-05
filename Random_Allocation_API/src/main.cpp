#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <iostream>
#include <vector>
#include <cmath>
#include <random>
#include <cstdlib>
#include <ctime>
#include <algorithm>

using namespace std;
namespace py = pybind11;

struct Point
{
    double x;
    double y;
};

std::vector<Point> FieldRP(double side, int selection, int choice, double value)
{
    Point startPoint;

    if (selection == 1)
    {
        startPoint = {0, 0};
    }
    else if (selection == 2)
    {
        startPoint = {-side / 2, side / 2};
    }
    else if (selection == 3)
    {
        startPoint = {-side / 2, 0};
    }
    else if (selection == 4)
    {
        startPoint = {-side / 2, -side / 2};
    }
    else if (selection == 5)
    {
        startPoint = {0, -side / 2};
    }
    else if (selection == 6)
    {
        startPoint = {side / 2, -side / 2};
    }
    else if (selection == 7)
    {
        startPoint = {side / 2, 0};
    }
    else if (selection == 8)
    {
        startPoint = {side / 2, side / 2};
    }
    else if (selection == 9)
    {
        startPoint = {0, side / 2};
    }
    else
    {
    }

    double radius;
    int numPoints;
    double area = side * side;

    if (choice == 0)
    {
        numPoints = static_cast<int>(value);
        int area_of_circle = area / numPoints;
        radius = sqrt(area_of_circle / M_PI);
    }
    else if (choice == 1)
    {
        radius = value;
        int area_of_circle = M_PI * radius * radius;
        numPoints = round(area / area_of_circle);
    }

    std::vector<Point> coordinates;
    coordinates.push_back(startPoint);

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<> dis(0, 2 * M_PI);

    while (coordinates.size() < numPoints) {
        double angle = dis(gen);
        double radiusOffset = 2 * radius;
        double x = startPoint.x + radiusOffset * std::cos(angle);
        double y = startPoint.y + radiusOffset * std::sin(angle);

        if (x >= -side/2 && x <= side/2 && y >= -side/2 && y <= side/2) {
            coordinates.push_back({x, y});
        }
    }

    return coordinates;
}

std::vector<Point> ExcelRP(double side, double selection)
{
    double N = side;
    double area = side * side;
    double area_of_circle = area / N;
    double radius = sqrt(area_of_circle / M_PI);
    double diameter = 2 * radius;

    std::vector<Point> coordinates;
    std::vector<Point> XOld;
    std::vector<Point> L;
    std::vector<Point> X;

    double i;
    if (selection == 0)
    {
        i = 1.0;
    }
    else
    {
        i = selection;
    }

    for (double j = 1.0; j < side + 1; j++)
    {
        XOld.push_back({i, j});
    }

    srand(static_cast<unsigned int>(time(0)));
    double random1 = rand() % XOld.size();
    double selectA = XOld[random1].x;
    double selectB = XOld[random1].y;
    coordinates.push_back({selectA, selectB});

    double iNew = 0.0;
    while (iNew <= 2 * M_PI)
    {
        double a = round(diameter * cos(iNew));
        double b = diameter * sin(iNew);
        L.push_back({a, ceil(b)});
        L.push_back({a, floor(b)});
        iNew += M_PI / 180;
    }

    for (double j = 0.0; j < L.size() - 1; j++)
    {
        if (L[j].x != L[j + 1].x || L[j].y != L[j + 1].y)
        {
            X.push_back({L[j].x, L[j].y});
        }
    }

    if (selection == 0)
    {
        for (double j = 0.0; j < N - 1; j++)
        {
            std::vector<Point> X1;
            for (double k = 0.0; k < X.size(); k++)
            {
                double x = X[k].x + selectA;
                double y = X[k].y + selectB;
                if (x == j + 2 && x >= 1 && y >= 1 && x <= side && y <= side)
                {
                    X1.push_back({x, y});
                }
            }
            double random2 = rand() % X1.size();
            selectA = X1[random2].x;
            selectB = X1[random2].y;
            coordinates.push_back({selectA, selectB});
        }
    }
    else
    {
        std::vector<double> column_nos;
        column_nos.push_back(selection);

        std::vector<double> column;
        for (double j = 1.0; j < N + 1; j++)
        {
            column.push_back(j);
        }
        std::sort(column.begin(), column.end());

        while (column_nos != column)
        {
            std::vector<Point> X1;
            for (double k = 0.0; k < X.size(); k++)
            {
                double x = X[k].x + selectA;
                double y = X[k].y + selectB;
                if (x >= 1 && y >= 1 && x <= side && y <= side)
                {
                    X1.push_back({x, y});
                }
            }

            double random2 = rand() % X1.size();
            selectA = X1[random2].x;
            selectB = X1[random2].y;

            if (std::find(column_nos.begin(), column_nos.end(), selectA) != column_nos.end())
            {
                continue;
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
        .def(py::init<double, double>()) // Point takes 2 longs to construct
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