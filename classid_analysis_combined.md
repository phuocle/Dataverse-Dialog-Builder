# Combined ClassID Analysis: Headers vs Footers

Comparative analysis of ClassID usage in header and footer nodes.

## ClassID Usage Comparison

| ClassID | Control Type | Header Usage | Footer Usage | Total Usage |
|---------|--------------|--------------|--------------|-------------|
| `{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}` | Button Control | 0 | 283 | 283 |
| `{00ad73da-bd4d-49c6-88a8-2f4f4cad4a20}` | Button Control | 0 | 297 | 297 |
| `{0D2C745A-E5A8-4c8f-BA63-C6D3BB604660}` | Chart Control | 2 | 0 | 2 |
| `{1E1FC551-F7A8-43af-AC34-A8DC35C7B6D4}` | Map Control | 1 | 0 | 1 |
| `{270BD3DB-D9AF-4782-9025-509E298DEC0A}` | Lookup Control | 145 | 12 | 157 |
| `{270bd3db-d9af-4782-9025-509e298dec0a}` | Lookup Control | 1 | 0 | 1 |
| `{3246F906-1F71-45F7-B11F-D7BE0F9D04C9}` | Social Activity Control | 1 | 0 | 1 |
| `{39354E4A-5015-4D74-8031-EA9EB73A1322}` | Label Control | 288 | 0 | 288 |
| `{39354e4a-5015-4d74-8031-ea9eb73a1322}` | Label Control | 171 | 0 | 171 |
| `{3EF39988-22BB-4F0B-BBBE-64B5A3748AEE}` | OptionSet Control | 5 | 0 | 5 |
| `{3EF39988-22BB-4f0b-BBBE-64B5A3748AEE}` | OptionSet Control | 110 | 171 | 281 |
| `{4273EDBD-AC1D-40D3-9FB2-095C621B552D}` | Text Input Control | 1 | 5 | 6 |
| `{4273EDBD-AC1D-40d3-9FB2-095C621B552D}` | Text Input Control | 25 | 1 | 26 |
| `{4273edbd-ac1d-40d3-9fb2-095c621b552d}` | Text Input Control | 0 | 6 | 6 |
| `{533B9E00-756B-4312-95A0-DC888637AC78}` | IFrame Control | 24 | 0 | 24 |
| `{5B773807-9FB2-42DB-97C3-7A91EFF8ADFF}` | DateTime Control | 4 | 0 | 4 |
| `{5B773807-9FB2-42db-97C3-7A91EFF8ADFF}` | DateTime Control | 55 | 6 | 61 |
| `{5D68B988-0661-4db2-BC3E-17598AD3BE6C}` | Web Resource Control | 43 | 0 | 43 |
| `{67FAC785-CD58-4f9f-ABB3-4B7DDC6ED5ED}` | Quick View Form | 6 | 0 | 6 |
| `{ADA2203E-B4CD-49be-9DDF-234642B43B52}` | Knowledge Base Search | 4 | 0 | 4 |
| `{C3EFE0C3-0EC6-42be-8349-CBD9079DFD8E}` | Note Control | 7 | 0 | 7 |
| `{C6D124CA-7EDA-4A60-AEA9-7FB8D318B68F}` | Timer Control | 1 | 0 | 1 |
| `{C6D124CA-7EDA-4a60-AEA9-7FB8D318B68F}` | Timer Control | 8 | 4 | 12 |
| `{CBFB742C-14E7-4a17-96BB-1A13F7F64AA2}` | Activity Feed Control | 1 | 0 | 1 |
| `{F9A8A302-114E-466A-B582-6771B2AE0D92}` | Number Control | 1 | 0 | 1 |

## Usage Patterns Analysis

- **ClassIDs used only in headers:** 16
- **ClassIDs used only in footers:** 3
- **ClassIDs used in both:** 6

### Header-Only ClassIDs

- `{0D2C745A-E5A8-4c8f-BA63-C6D3BB604660}` - Chart Control
- `{1E1FC551-F7A8-43af-AC34-A8DC35C7B6D4}` - Map Control
- `{270bd3db-d9af-4782-9025-509e298dec0a}` - Lookup Control
- `{3246F906-1F71-45F7-B11F-D7BE0F9D04C9}` - Social Activity Control
- `{39354E4A-5015-4D74-8031-EA9EB73A1322}` - Label Control
- `{39354e4a-5015-4d74-8031-ea9eb73a1322}` - Label Control
- `{3EF39988-22BB-4F0B-BBBE-64B5A3748AEE}` - OptionSet Control
- `{533B9E00-756B-4312-95A0-DC888637AC78}` - IFrame Control
- `{5B773807-9FB2-42DB-97C3-7A91EFF8ADFF}` - DateTime Control
- `{5D68B988-0661-4db2-BC3E-17598AD3BE6C}` - Web Resource Control
- `{67FAC785-CD58-4f9f-ABB3-4B7DDC6ED5ED}` - Quick View Form
- `{ADA2203E-B4CD-49be-9DDF-234642B43B52}` - Knowledge Base Search
- `{C3EFE0C3-0EC6-42be-8349-CBD9079DFD8E}` - Note Control
- `{C6D124CA-7EDA-4A60-AEA9-7FB8D318B68F}` - Timer Control
- `{CBFB742C-14E7-4a17-96BB-1A13F7F64AA2}` - Activity Feed Control
- `{F9A8A302-114E-466A-B582-6771B2AE0D92}` - Number Control

### Footer-Only ClassIDs

- `{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}` - Button Control
- `{00ad73da-bd4d-49c6-88a8-2f4f4cad4a20}` - Button Control
- `{4273edbd-ac1d-40d3-9fb2-095c621b552d}` - Text Input Control

### Shared ClassIDs (Used in Both Headers and Footers)

- `{270BD3DB-D9AF-4782-9025-509E298DEC0A}` - Lookup Control
- `{3EF39988-22BB-4f0b-BBBE-64B5A3748AEE}` - OptionSet Control
- `{4273EDBD-AC1D-40D3-9FB2-095C621B552D}` - Text Input Control
- `{4273EDBD-AC1D-40d3-9FB2-095C621B552D}` - Text Input Control
- `{5B773807-9FB2-42db-97C3-7A91EFF8ADFF}` - DateTime Control
- `{C6D124CA-7EDA-4a60-AEA9-7FB8D318B68F}` - Timer Control
