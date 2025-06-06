import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import SignaturePad from "react-signature-canvas";

const ConfigureSignatureForm: React.FC = () => {
  const [signaturePolicy, setSignaturePolicy] = useState<"single" | "double">(
    "single"
  );
  const [sig1Method, setSig1Method] = useState<"upload" | "draw" | "">("");
  const [sig2Method, setSig2Method] = useState<"upload" | "draw" | "">("");

  const [sig1File, setSig1File] = useState<File | null>(null);
  const [sig2File, setSig2File] = useState<File | null>(null);

  const sig1PadRef = useRef<SignaturePad | null>(null);
  const sig2PadRef = useRef<SignaturePad | null>(null);

  const handlePolicyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "single" | "double";
    setSignaturePolicy(value);
    if (value === "single") {
      setSig2Method("");
      setSig2File(null);
    }
  };

  const handleSig1Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSig1File(file);
    setSig1Method("upload");
  };

  const handleSig2Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSig2File(file);
    setSig2Method("upload");
  };

  const handleDraw = (signatureNum: 1 | 2) => {
    if (signatureNum === 1) {
      setSig1Method("draw");
      setSig1File(null);
    } else {
      setSig2Method("draw");
      setSig2File(null);
    }
  };

  const handleClear = (pad: SignaturePad | null) => {
    pad?.clear();
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Signature Policy</FormLabel>
          <RadioGroup row value={signaturePolicy} onChange={handlePolicyChange}>
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="Single Signature"
            />
            <FormControlLabel
              value="double"
              control={<Radio />}
              label="Double Signature"
            />
          </RadioGroup>
        </FormControl>

        {/* Signature 1 */}
        <Box>
          <Typography variant="h6">Signature 1</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" component="label">
              Upload Signature
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleSig1Upload}
              />
            </Button>
            <Button variant="outlined" onClick={() => handleDraw(1)}>
              Draw Signature
            </Button>
          </Stack>

          {sig1Method === "upload" && sig1File && (
            <Typography variant="body2" mt={1}>
              Uploaded: {sig1File.name}
            </Typography>
          )}

          {sig1Method === "draw" && (
            <Box mt={2}>
              <SignaturePad
                ref={sig1PadRef}
                canvasProps={{
                  width: 400,
                  height: 150,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc" },
                }}
              />
              <Button onClick={() => handleClear(sig1PadRef.current)}>
                Clear
              </Button>
            </Box>
          )}
        </Box>

        {/* Signature 2 */}
        {signaturePolicy === "double" && (
          <Box>
            <Typography variant="h6">Signature 2</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" component="label">
                Upload Signature
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSig2Upload}
                />
              </Button>
              <Button variant="outlined" onClick={() => handleDraw(2)}>
                Draw Signature
              </Button>
            </Stack>

            {sig2Method === "upload" && sig2File && (
              <Typography variant="body2" mt={1}>
                Uploaded: {sig2File.name}
              </Typography>
            )}

            {sig2Method === "draw" && (
              <Box mt={2}>
                <SignaturePad
                  ref={sig2PadRef}
                  canvasProps={{
                    width: 400,
                    height: 150,
                    className: "sigCanvas",
                    style: { border: "1px solid #ccc" },
                  }}
                />
                <Button onClick={() => handleClear(sig2PadRef.current)}>
                  Clear
                </Button>
              </Box>
            )}
          </Box>
        )}

      </Stack>
    </Paper>
  );
};

export default ConfigureSignatureForm;
