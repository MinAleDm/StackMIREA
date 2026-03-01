package Task8;

import javax.swing.*;
import java.awt.*;
import java.util.Timer;
import java.util.TimerTask;

public class Animation {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Анимация");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        final ImageIcon[] icon = {new ImageIcon("D:\\Обои\\1234.jpeg")};
        //ImageIcon icon1 = new ImageIcon("D:\\Обои\\1680.jpg");
        JLabel label1;
        final JLabel[] label2 = new JLabel[1];
        label1 = new JLabel("lol", icon[0], SwingConstants.CENTER);
        //label2 = new JLabel("lop", icon1, SwingConstants.CENTER);
        JPanel panel = new JPanel();
        panel.setBackground(Color.BLACK);
        panel.setPreferredSize(new Dimension(1919, 1079));
        panel.add(label1);
        //panel.add(label2);
        frame.getContentPane().add(panel);
        frame.pack();
        frame.setVisible(true);
        final int[] count = {0};
        Timer t = new Timer();
        TimerTask animate = null;
        t.schedule(animate, 1, 200);
        animate = new TimerTask() {
            @Override
            public void run() {
                switch (count[0]) {
                    case 0:
                        ImageIcon icon = new ImageIcon("D:\\Обои\\1680.jpg");
                        JLabel label2 = new JLabel("lop", icon, SwingConstants.CENTER);
                        JPanel panel1 = new JPanel();
                        panel1.add(label2);
                        break;
                    case 1:
                        ImageIcon icon1 = new ImageIcon("D:\\Обои\\1234.jpeg");
                        JLabel label3 = new JLabel("lop", icon1, SwingConstants.CENTER);
                        JPanel panel2 = new JPanel();
                        panel2.add(label3);
                        break;
                }
                count[0]++;
                if(count[0] == 2) {
                    count[0] = 0;
                }
            }
        };
    }
}
