import unittest
from matrix import Matrix

class TestMatrix(unittest.TestCase):

    def test_determinant_2x2(self):
        print('\n Testing 2x2 Determinant...')

        matrix_data = [[1,2], [3,4]]
        m = Matrix(matrix_data)

        result = m.determinant()

        self.assertEqual(result,-2)

if __name__ == '__main__':
    unittest.main()