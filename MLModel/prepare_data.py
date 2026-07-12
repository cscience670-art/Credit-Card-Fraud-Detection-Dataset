import os

def prepare_csv():
    raw_path = "creditcard"
    csv_path = "creditcard.csv"

    headers = "Time,V1,V2,V3,V4,V5,V6,V7,V8,V9,V10,V11,V12,V13,V14,V15,V16,V17,V18,V19,V20,V21,V22,V23,V24,V25,V26,V27,V28,Amount,Class\n"

    if not os.path.exists(raw_path):
        print(f"Error: Raw dataset file '{raw_path}' not found.")
        return

    print("Preparing creditcard.csv...")
    with open(raw_path, "r") as src, open(csv_path, "w") as dest:
        # Write headers
        dest.write(headers)
        
        # Write data rows
        for line in src:
            line_stripped = line.strip()
            if not line_stripped:
                continue
            dest.write(line_stripped + "\n")
            
    print("creditcard.csv created successfully!")

if __name__ == "__main__":
    prepare_csv()
