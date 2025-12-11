import sys
import os
sys.path.append(os.getcwd()) # Tells python look in the current folder too
import unittest
from matrix import Matrix

class TestMatrix(unittest.TestCase):

    def test_determinant_2x2(self):
        print('\n Testing 2x2 Determinant...')

        matrix_data = [[1,2], [3,4]]
        m = Matrix(matrix_data)

        result = m.determinant()

        self.assertEqual(result,-2)

    def test_determinant_3x3(self):
        print('\n Testing 3x3 Determinant...')

        matrix_data = [[1,2,3], [4,5,6], [7,8,9]]
        m = Matrix(matrix_data)

        result = m.determinant()

        self.assertEqual(result,0)
    # def test_inverse(self):
    #     print('\n Testing Matrix inverse...')
    #     matrix_data = [[3,5,-2], [1,0,3], [4,9,6]]
    #     m = Matrix(matrix_data)
    #
    #     result = m.inverse()
    #
    #     self.assertEqual(result, result)


if __name__ == '__main__':
    unittest.main()