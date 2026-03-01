package Task8;

import javax.swing.*;
import java.awt.*;
import java.util.Random;

//import static javax.swing.UIManager.getColor;

abstract class Shape {
    Color color;
    int x;
    int y;

    public Shape(Color color, int x, int y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    public abstract void draw(Graphics g);
}

class RectangleShape extends Shape {
    private int width;
    private int height;

    public RectangleShape(Color color, int x, int y, int width, int height) {
        super(color, x, y);
        this.width = width;
        this.height = height;
    }
    public Color getColor(){
        return null;
    }
    @Override
    public void draw(Graphics g) {
        g.setColor(getColor());
        g.fillRect(x, y, width, height);
    }
}

class CircleShape extends Shape {
    private int radius;
    private Random random = new Random();
    public CircleShape(Color color, int x, int y, int radius) {
        super(color, x, y);
        this.radius = radius;
    }

    @Override
    public void draw(Graphics g) {
        g.setColor(getColor());
        g.fillOval(x, y, 2 * radius, 2 * radius);
    }

    private Color getColor() {
        Color randomColor = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
        return randomColor;
    }
}

public class RandomShapes extends JPanel {
    private static final int WIDTH = 800;
    private static final int HEIGHT = 600;
    private static final int NUM_SHAPES = 20;

    private final Random random = new Random();

    private RandomShapes() {
        setPreferredSize(new Dimension(WIDTH, HEIGHT));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (int i = 0; i < NUM_SHAPES; i++) {
            int x = random.nextInt(WIDTH);
            int y = random.nextInt(HEIGHT);
            int shapeType = random.nextInt(2);
            if (shapeType == 0) {
                int width = random.nextInt(100) + 20;
                int height = random.nextInt(100) + 20;
                RectangleShape rectangle = new RectangleShape(Color.red, x, y, width, height);
                rectangle.draw(g);
            } else {
                int radius = random.nextInt(50) + 10;
                CircleShape circle = new CircleShape(Color.red, x, y, radius);
                circle.draw(g);
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Random Shapes");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.add(new RandomShapes());
            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}
