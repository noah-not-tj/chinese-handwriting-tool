

typedef struct {
    char v;
    int x;
    int y;
} Instruction;

void penup(int up) {

    if (up > 0) {
        cmotor.spin(45);
    } else {
        cmotor.spin(-45);
    }
}

void motorMove(x,y) {
    float xamount = x  * 1.5 / 1024;
    float yamount = y * 1.5 / 1024;
    if (x >= 0) {
        amotor.spin(xamount)
    } else if (x < 0) {
        amotor.spin(xamount * -1);
    }

    if (y >= 0) {
        bmotor.spin(yamount);
    } else if (y < 0) {
        bmotor.spin(yamount * -1);
    }
}

void draw (Instruction j) {
    if (j.v == 'M') {
        penup(1);
        motorMove(j.x, j.y );
        penup(-1);
    } else {
        if (j.v == 'L') {
            motorMove(j.x, j.y);
        }
    }
    else {
        error("yeah idk man");
    }
}

Instruction tokenize(char *s) {
    Instruction j;
    int i = sscanf(s, "%c,%d,%d", &j.v, &j.x, &j.y);

    if (i != 3) {
        error("didn't tokeny right");
    }
    else {
        return j;
    }

}

void setup() {
    Serial.begin(9600);
}

void loop() {

    if (Serial.available > 0) {
        char *incomingData = Serial.readStringUntil('\n');
        draw(tokenize(incomingData));
        
    }
    delay(100);
}